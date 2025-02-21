/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-20 20:13:07
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-20 20:28:37
 * @FilePath: src/store/module/login/index.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { defineStore } from 'pinia';

const useLoginStore = defineStore('login', {
    state: () => {
        return {
            accessToken: '',
            userInfo: {},
        };
    },
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
        },
        setUserInfo(info: any) {
            this.userInfo = info;
        },
        loginAction() {
            console.log('loginAction');
        },
    },
});

export default useLoginStore;
