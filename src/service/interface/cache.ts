import type { ServiceResult } from '@/service/request/config/handle.ts';

export interface CommandItem {
    description?: any;
    originalValue?: any;
    value?: any;
}

export interface ICache {
    redisInfo: {
        redisVersion: CommandItem;
        uptimeInDays: CommandItem;
        connectedClients: CommandItem;
        usedMemoryHuman: CommandItem;
        totalSystemMemoryHuman: CommandItem;
        RDBLoading: CommandItem;
        AOFEnabled: CommandItem;
        commands?: CommandItem[];
    };
    redisCommands: any[];

    [prototype: string]: any;
}

export type TCacheDetailResult = ServiceResult<ICache>;
