function ErrorBoundaryFallback({ error }: { error: Error}) {
  console.log("ErrorBoundaryFallback", error)
  return <>{error?.message || "Smth went wrong"}</>
}

export default ErrorBoundaryFallback;