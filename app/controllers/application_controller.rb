class ApplicationController < ActionController::Base
  before_action :set_js_environment

  private

  def set_js_environment
    gon.private_key = ENV.fetch('PRIVATE_KEY')
  end
end
