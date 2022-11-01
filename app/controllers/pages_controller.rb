class PagesController < ApplicationController
  def home
    @creators = Creator.first(10)
    @raffles = Raffle.first(10)
    @raffle_items = RaffleItem.first(10)
  end
end
