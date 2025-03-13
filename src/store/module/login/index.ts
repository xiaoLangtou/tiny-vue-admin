/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 20:13:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-12 17:38:02
 * @FilePath: src/store/module/login/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { LOGIN_URL } from '@/global/constants';
import router from '@/router';
import { getUserMenu, login, logout } from '@/service/apis/login';
import type { IAccount } from '@/service/interface/login';
import type { TLoginState } from '@/store/module/login/types';
import { to } from '@/utils/result-handler';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { message, Modal } from 'ant-design-vue';

/* @ts-expect-error 需要兼容旧版本 API*/
import md5 from 'md5';
import { defineStore } from 'pinia';
import { createVNode } from 'vue';

const [messageApi] = message.useMessage();
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
            if (code !== 0) return messageApi.error(message);
            this.setUserInfo({
                userInfo,
            });
            await router.replace('/');

            messageApi.success('欢迎回来');
        },
        async getAuthMenuList() {
            const result = await to(getUserMenu());
            if (!result.ok) return;
            this.setAuthMenuList({ authMenuList: result.value.data });
        },

        async logoutAction() {
            Modal.confirm({
                title: '提示',
                icon: createVNode(ExclamationCircleOutlined),
                content: '是否确认退出登录？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    // 执行退出登录接口
                    const result = await to(logout());
                    if (!result.ok) return;
                    this.setToken('');
                    this.setUserInfo({ userInfo: {} as unknown as TLoginState['userInfo'] });
                    this.setAuthMenuList({ authMenuList: [] });
                    await router.replace(LOGIN_URL);
                },
            });
        },
    },
});

export default useLoginStore;
