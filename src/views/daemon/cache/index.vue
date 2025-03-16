<template>
    <div class="xlt-base-container">
        <div class="xlt-container">
            <div class="card content-box w-full">
                <div class="cache-card flex justify-between items-center flex-wrap gap-3">
                    <div v-for="(item, key) in cacheInfo.redisInfo" :key="key" class="cache-card__item">
                        <div class="item-top flex justify-between items-center">
                            <span class="item-title">{{ formatterRedisInfoDesc(item) }}</span>
                            <ChartArea :size="24" color="rgba(54, 124, 255, 1)"></ChartArea>
                        </div>
                        <div class="item-bottom">
                            <span class="item-value">{{ formatterRedisInfoValue(item) }}</span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="cacheInfo.redisCommands && cacheInfo.redisCommands.length"
                    class="cache-charts flex items-center justify-center gap-7"
                >
                    <div class="cache-command-charts">
                        <ECharts ref="commandsChartsRef" :option="commandsChartsOptions" width="500" height="500" />
                    </div>
                    <div class="cache-command-charts">
                        <ECharts ref="sizeChartsRef" :option="sizeChartsOptions" width="500" height="500" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ECharts from '@/components/ECharts/index.vue';
import { getCacheDetail } from '@/service/apis/cache';
import type { ICache } from '@/service/interface/cache';
import { ChartArea } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const cacheInfo = ref<ICache>({
    redisCommands: [],
    redisInfo: {
        redisVersion: {
            description: 'Redis版本',
            value: 0,
        },
        uptimeInDays: {
            description: '运行天数',
            value: 0,
        },
        connectedClients: {
            description: '客户端连接数',
            value: 0,
        },
        usedMemoryHuman: {
            description: '内存使用',
            value: 0,
        },
        totalSystemMemoryHuman: {
            description: '内存总量',
            value: 0,
        },
        RDBLoading: {
            description: 'RDB加载中',
            value: 0,
        },
        AOFEnabled: {
            description: 'AOF是否开启',
            value: 0,
        },
    },
});
const commandsChartsRef = ref();
const sizeChartsRef = ref();
const commandsChartsOptions = ref<Record<string, any>>({
    legend: {
        top: 'bottom',
    },
    series: [],
});
const sizeChartsOptions = ref<Record<string, any>>({
    tooltip: {
        formatter: '{a} <br/>{b} : {c}K',
    },
    series: [],
});
const getDetail = async () => {
    const { data } = await getCacheDetail();
    cacheInfo.value.redisCommands = data && data.redisCommands ? data.redisCommands : [];
    cacheInfo.value.redisInfo =
        data && data.redisInfo
            ? Object.assign({}, cacheInfo.value.redisInfo, data.redisInfo)
            : { ...cacheInfo.value.redisInfo };

    commandsChartsOptions.value = {
        ...commandsChartsOptions.value,
        series: [
            {
                name: '命令统计',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                itemStyle: {
                    borderRadius: 8,
                },
                data: data.redisCommands,
            },
        ],
    };

    sizeChartsOptions.value = {
        ...sizeChartsOptions.value,
        series: [
            {
                name: 'Pressure',
                type: 'gauge',
                min: 0,
                max: 10000,
                progress: {
                    show: true,
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}',
                },
                data: [
                    {
                        value: formatterValue(data.redisInfo.usedMemoryHuman.value),
                        name: '内存使用',
                    },
                ],
            },
        ],
    };
};

const formatterValue = (value: string) => {
    // 将单位转换为MB
    return Number(value.replace('K', ''));
};

const formatterRedisInfoValue = (item: any) => {
    return item && item.value ? item.value : '';
};
const formatterRedisInfoDesc = (item: any) => {
    return item && item.description ? item.description : '';
};
onMounted(() => {
    getDetail();
});
</script>

<style scoped lang="scss">
.cache-card {
    box-sizing: border-box;
    width: 100%;

    &__item {
        box-sizing: border-box;
        flex: 1;
        min-width: 268px;
        padding: 20px;
        background: rgb(250 250 250 / 100%);
        border-radius: 4px;
    }

    .item-title {
        font-size: 14px;
        color: rgb(128 128 128 / 100%);
    }

    .item-value {
        font-size: 24px;
        font-weight: 700;
        color: rgb(51 51 51 / 100%);
    }

    .item-top {
        box-sizing: border-box;
        width: 100%;
    }
}

.cache-charts {
    width: 100%;
    height: 600px;
}

.cache-command-charts {
    display: flex;
    flex: 0 0 50%;
    align-items: center;
    justify-content: center;
}
</style>
