/**
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-02-22 15:56:41
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-02-23 11:05:18
 * @FilePath: src/store/module/login/types.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { IUserInfo } from '@/service/interface/login';

export interface TLoginState {
    token: string;
    userInfo: IUserInfo;
    authMenuList: any[];
}
