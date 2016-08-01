Rails.application.routes.draw do
  root 'home#index'
  get '/auth/facebook/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  delete 'logout', to: 'sessions#destroy'

  get 'visited_countries' => 'users#visited_countries'

  resources :trips, only: [:create, :show]

  resources :places_lived, only: [:create, :show]

  get 'policies/privacy', to: 'home#privacy'
end
