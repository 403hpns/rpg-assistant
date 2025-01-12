export async function getBreadcrumbs(pathname: string) {
  const path = pathname.split('/').filter(Boolean);

  const breadcrumbs = path.map((segment, index) => {
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + path.slice(0, index + 1).join('/'),
    };
  });

  return breadcrumbs;
}
