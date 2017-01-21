Rails.application.routes.draw do
  root 'home#index'
  get 'auth/facebook/callback', to: 'sessions#create'
  get 'auth/failure', to: 'sessions#failure'
  delete 'logout', to: 'sessions#destroy'

  get 'users/:id/visited_countries', to: 'users#visited_countries'
  get 'photos/update_facebook_urls', to: 'photos#update_facebook_urls'

  resources :trips, except: [:index] do
    member do
      post 'share'
    end
  end

  resources :places_lived, except: [:index]

  get 'share/:token', to: 'home#share'

  post 'share_requests/accept', to: "share_requests#accept", as: :accept_share_request

  get 'policies/privacy', to: 'home#privacy'
end
