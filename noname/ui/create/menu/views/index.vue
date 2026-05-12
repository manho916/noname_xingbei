<template>
	<div class="new-menu">
		<!-- tab -->
		<div class="new-menu-tab" ref="menuTabs">
			<div v-for="[tabName] in tabDataMap" @click="toggleTabName">{{ tabName }}</div>
		</div>
		<!-- content -->
		<div class="new-menu-content">
			<div>
				<div class="left pane" ref="leftPane">
					<div v-for="data in leftPaneData" :mode="data.attrs.mode" @click="toggleLeftPaneName" class="new-menubutton large">{{ data.name }}</div>
				</div>
				<div class="right pane" ref="rightPane"></div>
				<div class="menubutton round highlight" ref="startButton">啟</div>
			</div>
		</div>
	</div>
</template>

<script>
import {startMenuData, startMenutabName} from "../startMenu.js";
import {createApp, reactive} from "../../../../../game/vue.esm-browser.prod.js";

export default {
	props: {
		connectMenu: Boolean,
	},
	data() {
		return {
			tabName: null,
			rightPaneData: {
				element: null,
				app: null,
			},
			leftPaneData: [],
			/**
			 * @type { Map<string, menuData> }
			 */
			tabDataMap: new Map([
				[
					startMenutabName,
					startMenuData,
				],
				["選項", startMenuData],
				["角色", startMenuData],
				["卡牌", startMenuData],
				["擴展", startMenuData],
				["其它", startMenuData],
			]),
		};
	},
	methods: {
		/**
		 * @param { { target: HTMLElement } } param0
		 */
		toggleTabName({ target }) {
			if (!target) return console.warn(`target不存在`);
			if (target.classList.contains("active")) return;
			Array.from(target.parentElement?.children || []).forEach(node => {
				node.classList?.remove("active");
			});
			target.classList.add("active");
			this.tabName = target.innerText;
			/**
			 * @type { menuData }
			 */
			const data = this.tabDataMap.get(target.innerText);
			const leftPaneData = data?.initLeftPaneData?.(this.connectMenu);
			this.leftPaneData = Array.isArray(leftPaneData) ? leftPaneData : [];
			// 高亮默認元素
			this.$nextTick(() => {
				const ele =
					data?.getDefaultActive(this.connectMenu, Array.from(this.$refs.leftPane.children)) ||
					this.$refs.leftPane.firstElementChild;
				this.toggleLeftPaneName({ target: ele });
			});
		},
		/**
		 * @param { { target: HTMLElement } } param0
		 */
		toggleLeftPaneName({ target }) {
			if (!target) return console.warn(`target不存在`);
			if (target.classList.contains("active")) return;
			Array.from(target.parentElement?.children || []).forEach(node => {
				node.classList?.remove("active");
			});
			target.classList.add("active");
			/**
			 * @type { menuData }
			 */
			const data = this.tabDataMap.get(this.tabName);
			const rightPaneAppData = data.rightPaneApps.get(target);
			if (this.rightPaneData.element?.parentElement) {
				this.rightPaneData.element.remove();
			}
			// 緩存
			if (rightPaneAppData) {
				const parentElement = rightPaneAppData.element;
				this.$refs.rightPane.appendChild(parentElement);
				this.rightPaneData.element = parentElement;
				this.rightPaneData.app = rightPaneAppData.app;
			}
			else {
				const rightPaneTemplate = data?.rightPaneTemplate || { template: html`<div>還未編寫</div>` };
				data?.initConfigs?.(this.connectMenu, target, this.$refs.startButton);
				/** @type { string } */
					// @ts-ignore
				const mode = target.getAttribute("mode");
				const configs = data.configDatas.get(mode) || reactive({});
				if (!data.configDatas.get(mode)) {
					data.configDatas.set(mode, configs);
				}
				const app = createApp(rightPaneTemplate, { configs });
				app.mount(this.$refs.rightPane);
				this.rightPaneData.element = this.$refs.rightPane.firstElementChild;
				this.rightPaneData.app = app;
				data.rightPaneApps.set(target, { element: this.$refs.rightPane.firstElementChild, app });
			}
		},
	},
	mounted() {
		this.toggleTabName({ target: this.$refs.menuTabs.firstElementChild });
	},
};
</script>

<style scoped>

</style>
