module ApplicationHelper
  def icon(name)
    content_tag(:i, nil, class: "glyphicon glyphicon-#{name}")
  end
end