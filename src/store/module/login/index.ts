/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 20:13:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-22 14:42:40
 * @FilePath: src/store/module/login/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { defineStore } from 'pinia';
import { IAccount } from '@/service/interface/login';
import { login } from '@/service/module/login';
import md5 from 'md5';
import { Modal } from '@opentiny/vue';
import router from '@/router';

const useLoginStore = defineStore('login', {
    persist: true,
    state: () => {
        return {
            token: '',
            userInfo: {},
        };
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(info: any) {
            this.userInfo = info;
        },
        async loginAction(account: IAccount) {
            try {
                const { isSuccess } = await login({
                    username: account.username,
                    password: md5(account.password),
                });
                if (!isSuccess) return Modal.message({ message: '登录失败', status: 'error' });
                Modal.message({ message: '登录成功', status: 'success' });
                await router.replace('/');
            } catch (e) {}
        },
    },
});

export default useLoginStore;
