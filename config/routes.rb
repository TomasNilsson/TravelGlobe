Rails.application.routes.draw do
  root 'home#index'
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/failure', to: 'sessions#failure'
  delete 'logout', to: 'sessions#destroy'

  get 'users/:id/visited_countries', to: 'users#visited_countries'

  resources :trips, except: [:index]

  resources :places_lived, except: [:index]

  get 'share/:token', to: 'home#share'

  get 'policies/privacy', to: 'home#privacy'
end
