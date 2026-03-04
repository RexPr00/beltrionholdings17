const body = document.body;

const lockScroll = (lock) => body.classList.toggle('no-scroll', lock);

const trapFocus = (container, event) => {
  const focusables = container.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const drawer = document.querySelector('[data-drawer]');
const drawerOpen = document.querySelector('[data-menu-open]');
const drawerClose = document.querySelector('[data-menu-close]');
const drawerBackdrop = document.querySelector('[data-drawer-backdrop]');

function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  lockScroll(false);
}

if (drawer && drawerOpen && drawerClose && drawerBackdrop) {
  drawerOpen.addEventListener('click', () => {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    lockScroll(true);
    drawer.querySelector('a,button')?.focus();
  });
  drawerClose.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab' && drawer.classList.contains('open')) trapFocus(drawer, e);
  });
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-btn');
  btn?.addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) other.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

const modal = document.querySelector('[data-modal]');
const modalOpen = document.querySelectorAll('[data-open-privacy]');
const modalClose = document.querySelectorAll('[data-close-privacy]');

function closeModal() {
  modal?.classList.remove('open');
  lockScroll(false);
}

modalOpen.forEach((btn) => btn.addEventListener('click', () => {
  modal?.classList.add('open');
  lockScroll(true);
  modal?.querySelector('.icon-btn')?.focus();
}));
modalClose.forEach((btn) => btn.addEventListener('click', closeModal));
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab' && modal?.classList.contains('open')) trapFocus(modal.querySelector('.modal-card'), e);
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
