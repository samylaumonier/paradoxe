export function toggleSidebar() {
  if ($(window).width() < 801) {
    $('.ui.vertical.inverted.left.sidebar.secondary.menu').sidebar('toggle');
  }
}
