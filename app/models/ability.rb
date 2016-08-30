class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all  # TODO: change this when 'Share' is handled in a new way
    if user.present?
        can :manage, User, id: user.id
        can :manage, Trip, users: { id: user.id }
        can :manage, TravelPartner, user_id: user.id
        can :manage, Place, trip_id: user.trip_ids
        can :manage, Photo, trip_id: user.trip_ids
        can :manage, Category, user_id: user.id
        can :manage, PlaceLived, user_id: user.id
    end
  end
end
