class RafflesController < ApplicationController
  def index
    @raffles = Raffle.all
  end

  def new
    @raffle = Raffle.new
  end

  def create
    @raffle = Raffle.new(raffle_params)
    @raffle.creator = @creator

    if @raffle.save
      redirect_to edit_raffle_path(@raffle)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @raffle = Raffle.find(params[:id])
  end

  def show
    @raffle = Raffle.find(params[:id])
    @raffle_items = RaffleItems.where('')
  end

  def update
  end

  private

  def raffle_params
    tokens = params[:raffle][:creator_id].split(',')
    tokens.select do |token|
      Creator.find_by("pale_blue_tkn = ?", token)
    end

    @creator = Creator.find_by("pale_blue_tkn = ?", tokens.first)
    params.require(:raffle).permit(:title, :about, :photo)
  end
end
