import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("my_website");

// Local sheets-based deployment (no Google Drive required)
config.google_drive = { assets_folder_id: "assets", sheets_folder_id: "sheets" };
config.app_data.output_path = "./app_data";

config.app_config.APP_HEADER_DEFAULTS.title = "My Website";
config.app_config.APP_SIDEMENU_DEFAULTS.title = "My Website";
config.app_config.APP_ROUTE_DEFAULTS = {
  home_route: "/template/registration",
  fallback_route: "/template/registration",
};

// Disable external services for local/self-hosted deployment
config.api = {
  enabled: true,
  endpoint: "http://agent.home/api",
  db_name: "plh",
  sync_frequency: 1000 * 60 * 30, // 30 minutes
};
config.analytics = { enabled: false };

// Content git repo - update this URL to your actual repo
config.git = {
  content_repo: "https://github.com/justxuewei/idems-parenting-app-deployement.git",
  content_tag_latest: "v0.0.1",
};

export default config;
