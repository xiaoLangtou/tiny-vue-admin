<!--
 * @Author: weipc 755197142@qq.com
 * @Date: 2025-03-19 17:07:11
 * @LastEditors: weipc 755197142@qq.com
 * @LastEditTime: 2025-03-19 18:07:28
 * @FilePath: src/views/dashboard/components/timeline.vue
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 -->
<template>
    <div class="timeline-container">
        <a-timeline>
            <template v-for="(group, index) in groupedEvents" :key="index">
                <!-- Date header -->
                <a-timeline-item>
                    <template v-if="isToday(group.date) || isYesterday(group.date)" #dot>
                        <div class="date-header">
                            <div class="date-circle" :class="{ today: isToday(group.date) }">
                                <span v-if="isToday(group.date)">今天</span>
                                <span v-else-if="isYesterday(group.date)">昨天</span>
                            </div>
                        </div>
                    </template>
                    <span class="date-text">{{ formatDate(group.date) }}</span>
                </a-timeline-item>
                <template v-for="(event, eventIndex) in group.events" :key="`${index}-${eventIndex}`">
                    <a-timeline-item>
                        <div class="flex justify-between">
                            <div class="event-item">
                                <div class="user-info">
                                    <a-avatar :src="event.author.avatar_url.replace('!avatar30', '')" />
                                    <span class="user-name">{{ event.author.name }}</span>
                                </div>
                                <div class="event-icon">
                                    <a-icon :type="getEventIcon(event)" />
                                </div>
                                <div v-if="!event.target" class="event-content">
                                    <span class="event-action">{{ event.action_human_name }}</span>
                                    <span class="event-target">
                                        <a-button
                                            type="link"
                                            primary
                                            target="_blank"
                                            :href="`https://gitee.com${event.project.path}`"
                                            class="!pl-0 !pr-0"
                                        >
                                            {{ event.project.name_with_namespace }}</a-button
                                        >
                                        <template v-if="event.ref_name">
                                            的
                                            <a-button
                                                type="link"
                                                primary
                                                target="_blank"
                                                :href="`https://gitee.com${event.project_tree_path}`"
                                                class="!pl-0 !pr-0"
                                                >{{ event.ref_name }}</a-button
                                            >
                                            分支
                                        </template>
                                    </span>
                                </div>
                            </div>
                            <div>{{ formatterCreateTime(event.created_at) }}</div>
                        </div>

                        <!-- Commit detail if available -->
                        <div v-if="event.commits && event.commits.length > 0" class="commit-detail">
                            <div v-for="commit in event.commits" :key="commit.id" class="flex items-center gap-2">
                                <div class="commit-hash">
                                    <a-button
                                        type="link"
                                        primary
                                        target="_blank"
                                        :href="`https://gitee.com${commit.project_commit_path}`"
                                        class="!pl-0 !pr-0"
                                        >{{ commit.id }}
                                    </a-button>
                                </div>
                                <div class="commit-message">{{ commit.message }}</div>
                            </div>
                        </div>

                        <!-- Issue detail if available -->
                        <div v-if="event.target && event.target.type === 'issue'" class="issue-detail">
                            <span
                                >在
                                <a-button
                                    type="link"
                                    primary
                                    target="_blank"
                                    :href="`https://gitee.com${event.target.path}`"
                                    class="!pl-0 !pr-0"
                                    >{{ event.project.name_with_namespace }}
                                </a-button>
                                创建了 任务
                                <a-button
                                    type="link"
                                    primary
                                    target="_blank"
                                    :href="`https://gitee.com${event.target.path}`"
                                    class="!pl-0 !pr-0"
                                    >{{ event.target.pre_iid }} {{ event.targert?.title }}
                                </a-button>
                            </span>
                        </div>
                    </a-timeline-item>
                </template>
            </template>
        </a-timeline>
    </div>
</template>

<script setup lang="ts">
import { getGiteeNews } from '@/service/apis/common';
import { RelativeTimeFormatter } from '@/utils/relative-time';

const activities = ref([]);

const formatterCreateTime = (dateString: string) => {
    return RelativeTimeFormatter.format(dateString);
};
const groupedEvents = computed(() => {
    // Group events by date
    const groups = {};

    activities.value.forEach((event) => {
        const date = event.created_at.split('T')[0];
        if (!groups[date]) {
            groups[date] = {
                date,
                events: [],
            };
        }
        groups[date].events.push(event);
    });

    // Convert to array and sort by date (descending)
    return Object.values(groups).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
};

const isYesterday = (dateString) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const date = new Date(dateString);
    return (
        yesterday.getFullYear() === date.getFullYear() &&
        yesterday.getMonth() === date.getMonth() &&
        yesterday.getDate() === date.getDate()
    );
};

const getEventIcon = (event) => {
    switch (event.action) {
        case 'push':
            return 'arrow-up';
        case 'synced':
            return 'sync';
        case 'created':
            return 'plus-circle';
        case 'starred':
            return 'star';
        default:
            return 'notification';
    }
};

const getNews = async () => {
    const { data } = (await getGiteeNews()) as { data: any[] };
    console.log(data);

    activities.value = data ? data : [];
};

getNews();
</script>

<style scoped lang="scss">
.timeline-container {
    @apply p-5 select-none;
}

.date-header {
    @apply flex items-center;
}

.date-circle {
    background-color: #ff6b00;
    @apply size-9 rounded-full flex items-center justify-center text-white;
}

.date-text {
    @apply text-base font-semibold;
}

.user-info {
    @apply flex items-center;
}

.user-name {
    @apply ml-3 text-base;
}

.event-item {
    @apply flex items-center mb-2;
}

.commit-detail {
    @apply flex flex-col mt-1 ml-6 p-2 rounded bg-gray-100 dark:bg-bg-darkLayout dark:text-white;
}

.issue-detail {
    margin-top: 4px;
    margin-left: 24px;
}
</style>
