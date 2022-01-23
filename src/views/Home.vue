<template>
    <div class="home">
        <el-container class="home-container">
            <el-header class="my-header">
                <el-dropdown class="personal-wrap" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="personalEdit">修改信息</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
<!--                <span class="usernameTag">{{username}}</span>-->
                <button @click="handleLogout" class="logoutBtn"><i class="el-icon-switch-button"></i></button>
            </el-header>
            <el-container>
                <el-aside class="side-nav-container" width="280px">
                    <el-menu
                        default-active="/button"
                            class="el-menu-container"
                            :router="true"
                            @open="handleOpen"
                            @close="handleClose">
                        <template v-for="menu in menuTree">
                            <template v-if="menu.children">
                                <el-submenu  :index="menu.route" :key="menu.name">
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>{{ menu.title }}</span>
                                    </template>

                                    <el-menu-item-group v-for="subMenu in menu.children" :key="subMenu.name">
                                        <template slot="title"></template>
                                        <el-menu-item :index="subMenu.route">{{ subMenu.title }}</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="menu.route" :key="menu.name">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">{{menu.title}}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer class="my-footer">
                        张屁屁爱放屁   噗噗噗
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Home',
        data() {
            return {
                menuTree: [
                    {
                        title: 'Button 按钮',
                        route: '/button',
                        name: 'button',
                    },
                    {
                        title: 'Icon 图标',
                        route: '/icon',
                        name: 'icon',
                    },
                    {
                        title: 'Form 表单',
                        route: '/form',
                        name: 'form',
                        children: [
                            {
                                title: '基础表单',
                                route: '/basicForm',
                                name: 'basicForm',
                            },
                            {
                                title: 'antd-vue 表单',
                                route: '/antdForm',
                                name: 'antdForm',
                            }
                        ]
                    },
                    {
                        title: 'Article 文章',
                        route: '/article',
                        name: 'article',
                        children: [
                            {
                                title: '文章列表',
                                route: '/articleList',
                                name: 'articleList',
                            }
                        ]
                    },
                    {
                        title: 'vue-cropper',
                        route: '/vueCropper',
                        name: 'vueCropper',
                    },
                    {
                        title: 'map 地图',
                        route: '/map',
                        name: 'map',
                        children: [
                            {
                                title: 'vue2leaflet',
                                route: '/vue2leaflet',
                                name: 'vue2leaflet',
                            },
                            {
                                title: 'normalLeafletMap',
                                route: '/normalLeafletMap',
                                name: 'normalLeafletMap',
                            },
                            {
                                title: 'normalLeafletMap2',
                                route: '/normalLeafletMap2',
                                name: 'normalLeafletMap2',
                            },
                        ]
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                username: state => {
                    console.log(68, state)
                    return state["user"]["username"]
                }
            })
        },
        methods: {
            handleLogout() {
                this.$router.push({name: 'login'})
            },
            handleOpen(key, keyPath) {
                // console.log(userInfo)
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                this.$router.push({name: command})
                console.log(command);
            }
        },

    }
</script>

<style lang="scss">
    .home {
        min-height: 100vh;
        .home-container {
            height: 100%;
            .side-nav-container {
                height: calc(100vh - 60px);
                .el-menu-container {
                    height: 100%;
                }
            }
        }
    }
    .my-header {
        position: relative;
        background: #B3C0D1;
        .personal-wrap {
            position: absolute;
            right: 50px;
            top: 50%;
            color: #fff;
            transform: translateY(-50%);
        }
        .usernameTag {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            text-align: right;
            color: #fff;
            font-weight: bold;
        }
        .logoutBtn {
            position: absolute;
            right: 10px;
            top: 50%;
            border: none;
            background: transparent;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            transform: translateY(-50%);
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
        }
    }

    .my-footer {
        text-align: center;
        line-height: 60px;
    }
</style>
