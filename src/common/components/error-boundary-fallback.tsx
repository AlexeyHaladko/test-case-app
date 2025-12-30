function ErrorBoundaryFallback({ error }: { error: Error}) {
  return <>{error?.message || "Smth went wrong"}</>
}

export default ErrorBoundaryFallback;