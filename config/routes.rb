Rails.application.routes.draw do
  root to: "pages#home"
  resources :donations, only: ['index', 'show', 'update']
  # get '/about', to: 'pages#about'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :creators, only: ['new', 'create', 'show', 'edit', 'index', 'update'] do
    resources :donations, only: ['new', 'create']
    # resources :raffles, only: ['new', 'create', 'show', 'edit', 'update']
    # resources :fils, only: ['new', 'create']
  end
  # resources :raffles, only: ['index']
  # get '/transactions', to: 'pages#transactions', as: :transactions
  # post '/raffles/:id/redeem', to: 'raffles#redeem', as: :raffle_transactions
  # get '/available_downloads', to: 'pages#available_downloads', as: :available_downloads
end
