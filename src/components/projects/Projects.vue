<template>
  <div class="project-app">
    <div class="fixed-top">
      <PageHeader />

      <div class="search-box">
        <svg
          class="search-icon"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="9.73856"
            cy="9.73856"
            r="8.98856"
            stroke="#848A94"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.9903 16.4571L19.5143 19.972"
            stroke="#848A94"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <input type="text" placeholder="Search" class="search-input" />
      </div>

      <div class="filter-row">
        <div class="tab-group">
          <button class="tab-item active">Favourites</button>
          <button class="tab-item plain">Recents</button>
          <button class="tab-item plain">All</button>
        </div>
        <button class="layout-toggle">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.750006 4.25C0.750006 1.62479 0.778115 0.75 4.25001 0.75C7.7219 0.75 7.75001 1.62479 7.75001 4.25C7.75001 6.87521 7.76108 7.75 4.25001 7.75C0.738933 7.75 0.750006 6.87521 0.750006 4.25Z"
              stroke="#848A94"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.75 4.25C11.75 1.62479 11.7781 0.75 15.25 0.75C18.7219 0.75 18.75 1.62479 18.75 4.25C18.75 6.87521 18.7611 7.75 15.25 7.75C11.7389 7.75 11.75 6.87521 11.75 4.25Z"
              stroke="#848A94"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.750006 15.25C0.750006 12.6248 0.778115 11.75 4.25001 11.75C7.7219 11.75 7.75001 12.6248 7.75001 15.25C7.75001 17.8752 7.76108 18.75 4.25001 18.75C0.738933 18.75 0.750006 17.8752 0.750006 15.25Z"
              stroke="#848A94"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.75 15.25C11.75 12.6248 11.7781 11.75 15.25 11.75C18.7219 11.75 18.75 12.6248 18.75 15.25C18.75 17.8752 18.7611 18.75 15.25 18.75C11.7389 18.75 11.75 17.8752 11.75 15.25Z"
              stroke="#848A94"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <List />
  </div>
</template>

<script setup>
import PageHeader from "../medical/PageHeader.vue";
import List from "./ui/List.vue";
</script>

<style scoped>
/* Главный контейнер на всю высоту экрана/родителя */
.project-app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Или 100%, если у родителя задана высота */
  width: 100%;
  background-color: #fff;
  overflow: hidden; /* Важно: сам контейнер не должен скроллиться */
}

/* Статичная часть */
.fixed-top {
  flex-shrink: 0; /* Не позволяет шапке сжиматься */
  padding-bottom: 16px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #f1f5f9;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-box {
  position: relative;
  margin-bottom: 24px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  outline: none;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: #848a94;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-group {
  display: flex;
  gap: 8px;
}

.tab-item {
  border: none;
  background: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 171%;

  color: #848a94;
  padding: 4px 10px;
}

.tab-item.active {
  border: 1px solid #756ef3;
  border-radius: 16px;
  color: #002055;
}

.tab-item.plain {
  color: #94a3b8;
}

.layout-toggle {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
