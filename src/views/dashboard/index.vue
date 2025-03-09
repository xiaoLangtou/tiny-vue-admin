<template>
    <div class="dashboard-container p-4 md:p-6 space-y-6">
        <!-- 顶部欢迎区域 - 简化设计 -->
        <div class="welcome-section bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">
            <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                <div class="flex items-center">
                    <div class="relative">
                        <a-avatar :size="60" src="/src/assets/images/img.png" class="border-2 border-primary-100" />
                        <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    </div>
                    <div class="ml-4">
                        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">你好，Edward</h2>
                        <p class="text-gray-500 dark:text-gray-400">{{ formattedDate }}</p>
                    </div>
                </div>
                <div class="flex gap-3">
                    <a-button type="primary" class="action-button">
                        <template #icon><icon-view icon="plus" /></template>
                        新建项目
                    </a-button>
                    <a-tooltip title="查看所有报告">
                        <a-button class="icon-only-btn">
                            <template #icon><icon-view icon="file-text" /></template>
                        </a-button>
                    </a-tooltip>
                </div>
            </div>
        </div>

        <!-- 数据概览 - 更简洁、现代的卡片设计 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(stat, index) in statistics" :key="index"
                 class="stat-card bg-white dark:bg-gray-800 rounded-xl p-5 transition-all hover:shadow-md">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">{{ stat.title }}</p>
                        <h3 class="text-2xl font-bold mt-1 text-gray-900 dark:text-gray-100">{{ stat.value }}</h3>
                        <div v-if="stat.change" class="flex items-center mt-1">
                            <icon-view :icon="stat.change > 0 ? 'trending-up' : 'trending-down'"
                                       :class="stat.change > 0 ? 'text-green-500' : 'text-red-500'"
                                       class="text-sm mr-1" />
                            <span :class="stat.change > 0 ? 'text-green-500' : 'text-red-500'" class="text-xs">
                {{ Math.abs(stat.change) }}% {{ stat.change > 0 ? '增长' : '下降' }}
              </span>
                        </div>
                    </div>
                    <div class="p-3 rounded-lg" :class="stat.bgColor">
                        <icon-view :icon="stat.icon" :class="stat.iconColor" class="text-xl" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 主内容区域 - 优化布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <!-- 左侧内容区域 -->
            <div class="lg:col-span-4 space-y-6">
                <!-- 最新动态 - 清爽的时间轴设计 -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <div class="flex items-center justify-between mb-5">
                        <div class="flex items-center">
                            <icon-view icon="activity" class="text-primary mr-2" />
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">最新动态</h3>
                        </div>
                        <a-dropdown>
                            <a-button type="text" class="px-2">
                                <template #icon><icon-view icon="more-horizontal" /></template>
                            </a-button>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item key="1">查看全部</a-menu-item>
                                    <a-menu-item key="2">仅看重要</a-menu-item>
                                    <a-menu-item key="3">标记全部已读</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>

                    <div class="activity-timeline">
                        <div v-for="(activity, index) in activities" :key="index" class="activity-item">
                            <div v-if="index !== activities.length - 1" class="timeline-connector"></div>
                            <div class="flex">
                                <div class="activity-icon" :class="activity.iconBg">
                                    <icon-view :icon="activity.icon" />
                                </div>
                                <div class="ml-4">
                                    <div class="flex justify-between">
                                        <p class="text-gray-900 dark:text-gray-100 font-medium">{{ activity.title }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
                                    </div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 项目进度 - 新增的卡片 -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <div class="flex items-center justify-between mb-5">
                        <div class="flex items-center">
                            <icon-view icon="bar-chart-2" class="text-primary mr-2" />
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">项目进度</h3>
                        </div>
                        <a-button type="text" class="text-sm">查看全部</a-button>
                    </div>

                    <div class="space-y-4">
                        <div v-for="(project, index) in projects" :key="index" class="project-item">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center">
                                    <div class="w-2 h-2 rounded-full mr-2" :class="project.statusColor"></div>
                                    <span class="font-medium text-gray-800 dark:text-gray-200">{{ project.name }}</span>
                                </div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ project.progress }}%</span>
                            </div>
                            <a-progress :percent="project.progress" :stroke-color="project.progressColor" :show-info="false" size="small" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧边栏 -->
            <div class="lg:col-span-3 space-y-6">
                <!-- 快捷操作 - 更紧凑的设计 -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <div class="flex items-center mb-5">
                        <icon-view icon="zap" class="text-primary mr-2" />
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">快捷操作</h3>
                    </div>

                    <div class="grid grid-cols-4 gap-2">
                        <div v-for="menu in quickMenus" :key="menu.title"
                             class="quick-action flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors cursor-pointer">
                            <div class="w-8 h-8 flex items-center justify-center rounded-full mb-1" :class="menu.bgColor">
                                <icon-view :icon="menu.icon" :class="menu.iconColor" class="text-base" />
                            </div>
                            <span class="text-xs text-gray-700 dark:text-gray-300 text-center">{{ menu.title }}</span>
                        </div>
                    </div>
                </div>

                <!-- 公告列表 - 更紧凑的设计 -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <icon-view icon="bell" class="text-primary mr-2" />
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">公告列表</h3>
                        </div>
                        <a-button type="text" class="text-sm">查看全部</a-button>
                    </div>

                    <div class="space-y-2">
                        <div v-for="(announcement, index) in announcements" :key="index"
                             class="announcement-item p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <div class="flex items-start">
                                <div class="w-2 h-2 rounded-full mt-2 mr-2" :class="announcement.isNew ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'"></div>
                                <div class="flex-1 overflow-hidden">
                                    <p class="text-gray-800 dark:text-gray-200 font-medium text-sm truncate">{{ announcement.title }}</p>
                                    <div class="flex justify-between items-center mt-1">
                                        <span class="text-xs text-gray-500 dark:text-gray-400">{{ announcement.date }}</span>
                                        <a-tag v-if="announcement.tag" :color="announcement.tagColor" class="text-xs py-0 px-1">{{ announcement.tag }}</a-tag>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 团队成员 - 更紧凑的设计 -->
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <icon-view icon="users" class="text-primary mr-2" />
                            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">团队成员</h3>
                        </div>
                        <a-button type="text" class="text-sm flex items-center">
                            <icon-view icon="user-plus" class="mr-1 text-xs" /> 添加
                        </a-button>
                    </div>

                    <div class="space-y-2">
                        <div v-for="(member, index) in teamMembers" :key="index" class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <div class="flex items-center">
                                <a-avatar :src="member.avatar" :style="{backgroundColor: member.avatarBg}" :size="32">
                                    {{ !member.avatar ? member.name.charAt(0).toUpperCase() : '' }}
                                </a-avatar>
                                <div class="ml-2">
                                    <p class="text-sm text-gray-800 dark:text-gray-200">{{ member.name }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ member.role }}</p>
                                </div>
                            </div>
                            <div class="flex space-x-1">
                                <a-tooltip title="发送消息">
                                    <a-button type="text" shape="circle" size="small" class="h-6 w-6 flex items-center justify-center">
                                        <template #icon><icon-view icon="message-circle" class="text-xs" /></template>
                                    </a-button>
                                </a-tooltip>
                                <a-tooltip title="查看资料">
                                    <a-button type="text" shape="circle" size="small" class="h-6 w-6 flex items-center justify-center">
                                        <template #icon><icon-view icon="info" class="text-xs" /></template>
                                    </a-button>
                                </a-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// 格式化当前日期
const formattedDate = computed(() => {
    const now = dayjs()
    const today = now.format('YYYY年MM月DD日')
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekday = weekdays[now.day()]
    return `${today} ${weekday}`
})

// 统计数据
const statistics = ref([
    {
        title: '总项目数',
        value: '128',
        icon: 'briefcase',
        bgColor: 'bg-blue-50 dark:bg-blue-900/30',
        iconColor: 'text-blue-500 dark:text-blue-400',
        change: 12
    },
    {
        title: '进行中',
        value: '25',
        icon: 'play-circle',
        bgColor: 'bg-green-50 dark:bg-green-900/30',
        iconColor: 'text-green-500 dark:text-green-400',
        change: 8
    },
    {
        title: '已完成',
        value: '89',
        icon: 'check-circle',
        bgColor: 'bg-purple-50 dark:bg-purple-900/30',
        iconColor: 'text-purple-500 dark:text-purple-400',
        change: 5
    },
    {
        title: '团队成员',
        value: '12',
        icon: 'users',
        bgColor: 'bg-orange-50 dark:bg-orange-900/30',
        iconColor: 'text-orange-500 dark:text-orange-400',
        change: -2
    }
])

// 最新动态数据
const activities = ref([
    {
        title: '完成了项目方案设计',
        description: '已上传最终版设计方案到项目文件夹',
        time: '10分钟前',
        icon: 'check-circle',
        iconBg: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400'
    },
    {
        title: '开始新项目开发',
        description: '创建了"智能客服系统"项目并分配了团队成员',
        time: '1小时前',
        icon: 'play-circle',
        iconBg: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
    },
    {
        title: '团队会议总结',
        description: '讨论了Q2季度规划和项目进度',
        time: '2小时前',
        icon: 'users',
        iconBg: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
    },
    {
        title: '更新项目文档',
        description: '更新了API文档和使用说明',
        time: '3小时前',
        icon: 'file-text',
        iconBg: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
    }
])

// 快捷菜单数据 - 增强样式
const quickMenus = ref([
    {
        title: '创建任务',
        icon: 'plus-circle',
        bgColor: 'bg-blue-100 dark:bg-blue-900/50',
        iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
        title: '发起会议',
        icon: 'video',
        bgColor: 'bg-green-100 dark:bg-green-900/50',
        iconColor: 'text-green-600 dark:text-green-400'
    },
    {
        title: '文档中心',
        icon: 'folder',
        bgColor: 'bg-purple-100 dark:bg-purple-900/50',
        iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
        title: '通讯录',
        icon: 'users',
        bgColor: 'bg-orange-100 dark:bg-orange-900/50',
        iconColor: 'text-orange-600 dark:text-orange-400'
    }
])

// 公告列表数据 - 增加标签
const announcements = ref([
    {
        title: '关于系统升级维护的通知',
        date: '2024-03-15',
        isNew: true,
        tag: '重要',
        tagColor: 'red'
    },
    {
        title: '新功能发布：项目看板优化',
        date: '2024-03-14',
        isNew: true,
        tag: '新功能',
        tagColor: 'green'
    },
    {
        title: '春节假期安排通知',
        date: '2024-03-13',
        isNew: false,
        tag: '通知',
        tagColor: 'blue'
    },
    {
        title: '年度工作总结会议',
        date: '2024-03-12',
        isNew: false
    }
])

// 项目进度数据 - 新增
const projects = ref([
    {
        name: '企业官网改版',
        progress: 75,
        progressColor: '#4CAF50',
        statusColor: 'bg-green-500'
    },
    {
        name: '移动端APP开发',
        progress: 45,
        progressColor: '#2196F3',
        statusColor: 'bg-blue-500'
    },
    {
        name: '数据分析平台',
        progress: 90,
        progressColor: '#9C27B0',
        statusColor: 'bg-purple-500'
    },
    {
        name: '内部管理系统',
        progress: 30,
        progressColor: '#FF9800',
        statusColor: 'bg-orange-500'
    }
])

// 团队成员数据 - 新增
const teamMembers = ref([
    {
        name: '张小明',
        role: '前端开发',
        avatar: '/src/assets/avatars/avatar-1.jpg',
        avatarBg: '#4CAF50'
    },
    {
        name: '李静',
        role: 'UI设计师',
        avatar: '/src/assets/avatars/avatar-2.jpg',
        avatarBg: '#2196F3'
    },
    {
        name: '王大鹏',
        role: '产品经理',
        avatar: '',
        avatarBg: '#9C27B0'
    },
    {
        name: '赵小红',
        role: '后端开发',
        avatar: '/src/assets/avatars/avatar-4.jpg',
        avatarBg: '#FF9800'
    }
])
</script>

<style scoped lang="scss">
.dashboard-container {
    @apply bg-gray-50 dark:bg-gray-900 min-h-screen;
}

// 卡片统一样式
.bg-white {
    @apply shadow-sm;
}

// 活动时间轴
.activity-timeline {
    @apply space-y-5;

    .activity-item {
        @apply relative pb-5;

        .timeline-connector {
            @apply absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-0.5;
        }
    }
}

.activity-icon {
    @apply p-2 rounded-lg flex items-center justify-center min-w-8;
}

// 快捷操作hover效果
.quick-action {
    @apply w-full;

    &:hover {
        @apply transform scale-105 transition-transform;
    }
}

// 按钮样式
.action-button {
    @apply shadow-sm hover:shadow transition-shadow;
}

.icon-only-btn {
    @apply p-0 w-10 h-10 flex items-center justify-center;
}

// 项目进度条自定义样式
:deep(.ant-progress-bg) {
    @apply rounded-full;
}

// 公告列表样式优化
.announcement-item {
    @apply border-b border-gray-100 dark:border-gray-700 last:border-b-0;
}
</style>
