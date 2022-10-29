class RaffleItemsController < ApplicationController
  def index
    @raffle_item = RaffleItem.all
  end

  def new
    @raffle_item = RaffleItem.new
    @raffle = Raffle.find(params[:raffle_id])
  end

  def create
    @raffle_item = RaffleItem.new(raffle_item_params)
    @raffle = Raffle.find(params[:raffle_id])
    @raffle_item.raffle = @raffle

    if @raffle_item.save
      respond_to do |format|
        format.html { redirect_to raffle_raffle_items_path, notice: "Raffle Item was successfully created." }
        format.turbo_stream
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @raffle_item = RaffleItem.find(params[:id])
  end

  def show
    @raffle_item = RaffleItem.find(params[:id])
  end

  private

  def raffle_item_params
    params.require(:raffle_item).permit(:name, :description, :photo, :tkn_address)
  end
end
