/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 20:13:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 11:13:56
 * @FilePath: src/store/module/login/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { defineStore } from 'pinia';
import { IAccount } from '@/service/interface/login';
import { getUserInfo, getUserMenu, login } from '@/service/module/login';
// @ts-ignore
import * as md5 from 'md5';
import { Modal } from '@opentiny/vue';
import { to } from '@/utils/result-handler';
import router from '@/router';
import { TLoginState } from '@/store/module/login/types';

const useLoginStore = defineStore('login', {
    persist: [
        {
            pick: ['token', 'userInfo'],
            storage: localStorage,
        },
        {
            storage: sessionStorage,
            pick: ['authMenuList'],
        },
    ],
    state: (): TLoginState => {
        return {
            token: '',
            userInfo: {
                id: undefined,
                username: '',
                nickname: '',
                roles: [],
                permissions: [],
            },
            authMenuList: [],
        };
    },

    getters: {
        isLogin(): boolean {
            return !!this.token;
        },
        getToken(): string {
            return this.token;
        },
    },

    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(partial: Partial<TLoginState>) {
            this.$patch(partial);
        },
        setAuthMenuList(partial: Partial<TLoginState>) {
            this.$patch(partial);
        },
        async loginAction(account: IAccount) {
            const result = await to(
                login({
                    username: account.username,
                    password: md5(account.password),
                }),
            );
            if (!result.ok) return;
            const {
                code,
                data: { userInfo },
                message,
            } = result.value;
            if (code !== 0) return Modal.message({ message: message, status: 'error' });
            this.setUserInfo({
                userInfo,
            });
            await router.replace('/');
            Modal.message({
                message: '欢迎回来',
                status: 'success',
            });
        },
        async getAuthMenuList() {
            const result = await to(getUserMenu());
            if (!result.ok) return;
            this.setAuthMenuList({ authMenuList: result.value.data });
        },
    },
});

export default useLoginStore;
