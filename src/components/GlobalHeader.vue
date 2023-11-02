<template>
  <a-row
    id="globalHeader"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/dango2.png" />
              <div class="title">fly OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user.loginUser.userName }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();

const selectedKeys = ref(["/"]);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({ path: key });
};

const visibleRoutes = computed(() => {
  return routes
    .find((route) => route.path === "/")
    ?.children?.filter((item, index) => {
      if (item.meta?.hideInMenu) {
        return false;
      }
      // 根据权限过滤菜单
      if (
        !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
      ) {
        return false;
      }
      return true;
    });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
}

.title {
  text-align: center;
  margin-left: 14px;
  font-size: 20px;
}
</style>
