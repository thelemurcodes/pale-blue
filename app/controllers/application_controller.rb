class ApplicationController < ActionController::Base
  before_action :set_js_environment
  helper_method :set_connected

  private

  def set_connected
    @connected = false
  end

  def set_js_environment
    gon.private_key = ENV.fetch('PRIVATE_KEY')
  end
end
