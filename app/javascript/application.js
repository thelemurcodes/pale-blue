// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "bootstrap"

require("@rails/ujs").start()
global.Rails = Rails;

import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

