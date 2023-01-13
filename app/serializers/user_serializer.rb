class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :imageUrl, :token

  def imageUrl
    object.image_url
  end
end
