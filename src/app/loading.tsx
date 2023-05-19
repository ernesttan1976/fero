import WSkeleton from "./components/wrappedSkeleton";
import WSpin from "./components/wrappedSpin";

export default function Loading() {
  return (
    <>
    <WSpin size="large"/>
    <WSkeleton/>
    </>
  )
}
