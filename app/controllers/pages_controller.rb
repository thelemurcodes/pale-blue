class PagesController < ApplicationController
  def home
    @creators = Creator.first(10)
  end
end
