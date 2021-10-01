import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const layoutData = {
  props: {},
  loaders: {
    topNav: "<h1>Loading topnav...</h1>",
  },
};

const routes = constructRoutes(microfrontendLayout, layoutData);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

layoutEngine.activate();
start();
