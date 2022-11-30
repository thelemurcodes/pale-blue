class RafflesController < ApplicationController
  def index
    @raffles = Raffle.where(running: true)
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
    @raffle_items = RaffleItem.where('raffle_id = ?', @raffle)
  end

  def show
    @raffle = Raffle.find(params[:id])
    @raffle_items = RaffleItem.where('raffle_id = ?', @raffle)
  end

  def update
    @raffle = Raffle.find(params[:id])
    @temp_raffle = Raffle.new(raffle_temp_params)
    @raffle.end_date = @temp_raffle.end_date
    @raffle.end_time = @temp_raffle.end_time
    @raffle.running = @temp_raffle.running
    if @raffle.save
      redirect_to raffle_path(@raffle)
    else
      render :new, status: :unprocessable_entity
    end
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

  def raffle_temp_params
    params.require(:raffle).permit(:end_date, :end_time, :running)
  end
end
