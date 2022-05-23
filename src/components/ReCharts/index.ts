import { App } from "vue";
import reGithub from "./src/Github.vue";


export const ReGithub = Object.assign(reGithub, {
  install(app: App) {
    app.component(reGithub.name, reGithub);
  }
});



