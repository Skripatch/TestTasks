Messaging::Application.routes.draw do

  root :to => 'home#index'
  post 'login' => 'home#login'
  get 'logout' => 'home#logout'

  resources :messages do
    member do
      put 'toggle'
    end
  end

end
