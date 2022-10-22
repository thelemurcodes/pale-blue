class CreatorsController < ApplicationController
  def index
    @creators = Creator.all
  end

  def new
    @creator = Creator.new
  end

  def create
    @creator = Creator.new(creator_params)
    @creator.blockchain = Blockchain.first
    if @creator.save
      redirect_to creator_path(@creator)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @creator = Creator.find(params[:id])
    @raffles = Raffle.where(creator: @creator)
    @fils = Fil.where(creator: @creator)
  end

  def edit
    @creator = Creator.find(params[:id])
  end

  def update
    @creator = Creator.find(params[:id])
    if @creator.update(profile_params)
      redirect_to creator_path, notice: "Profile was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def creator_params
    params.require(:creator).permit(:answer_one, :answer_two, :answer_three, :pale_blue_tkn)
  end

  def profile_params
    params.require(:creator).permit(
      :photo,
      :name,
      :about,
      :facebook,
      :twitter,
      :instagram,
      :linkedin,
      :website,
      :discord
    )
  end
end
