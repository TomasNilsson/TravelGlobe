module ApplicationHelper
  def icon(name, extra_classes='')
    content_tag(:i, nil, class: "glyphicon glyphicon-#{name} #{extra_classes}")
  end
end