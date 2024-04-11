import { PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  timeout: 800000,
  retries: 0,
  testDir: 'tests/e2e/melio',
  use: {
    headless: true,
    trace: 'on',
    viewport: { width: 1920, height: 1080  },
    actionTimeout: 80000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    channel: 'chrome',
    screenshot: 'only-on-failure',
    launchOptions:{
      args: ['--start-maximized'],
    },
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium',
      launchOptions: {
        args: ["--start-maximized"]
        } 
     },   
    },
  ],
}
export default config