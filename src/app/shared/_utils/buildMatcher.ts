export function perfilBuildMatcher(url, group) {
  const segment = group.segments[0] && group.segments[0].path;
  if (!segment || segment !== 'perfil') {
    return null;
  }
  return {consumed: []};
}

export function cambiarContrasenaBuildMatcher(url, group) {
  const segment = group.segments[0] && group.segments[0].path;
  if (!segment || segment !== 'cambiarContrasena') {
    return null;
  }
  return {consumed: []};
}

export function alumnosBuildMatcher(url, group) {
  const segment = group.segments[0] && group.segments[0].path;
  if (!segment || segment !== 'alumnos') {
    return null;
  }
  return {consumed: []};
}
