
const _closeSidebar = (a, b, rootEl) => {
  a.classList.remove('SideBar-show');
  b.classList.remove('SideBarShadow-show');
  document.body.classList.remove('overflow-hidden');
  // about overflow in mobile devices, only the topmost element other than body is recognized
  // https://stackoverflow.com/questions/24193272/overflow-xhidden-on-mobile-device-not-working
  rootEl.classList.remove('overflow-hidden');
};


export function toggleSideBarShow() {
  const SideBarEl = document.getElementById('SideBar');
  const SideBarShadowEl = document.getElementById('SideBarShadow');
  // always exists because is the root element
  const rootEl = document.getElementById('__next');

  const open = (a, b) => {
    a.classList.add('SideBar-show');
    b.classList.add('SideBarShadow-show');
    document.body.classList.add('overflow-hidden');
    // about overflow in mobile devices, only the topmost element other than body is recognized
    // https://stackoverflow.com/questions/24193272/overflow-xhidden-on-mobile-device-not-working
    rootEl.classList.add('overflow-hidden');
  };

  if (SideBarEl && SideBarShadowEl) {
    const exists = document.querySelector('.SideBar-show');
    if (exists) _closeSidebar(SideBarEl, SideBarShadowEl, rootEl);
    else open(SideBarEl, SideBarShadowEl);

    SideBarShadowEl.onclick = () => _closeSidebar(SideBarEl, SideBarShadowEl, rootEl);
  }
}

export function closeSidebar() {
  // always exists because is the root element
  const rootEl = document.getElementById('__next');
  const SideBarEl = document.getElementById('SideBar');
  const SideBarShadowEl = document.getElementById('SideBarShadow');

  const exists = document.querySelector('.SideBar-show');
  if (exists) _closeSidebar(SideBarEl, SideBarShadowEl, rootEl);
}
