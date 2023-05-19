import WSkeleton from "../src/app/components/wrappedSkeleton";
import WSpin from "../src/app/components/wrappedSpin";

export default function Loading() {
  return (
    <>
    <WSpin size="large"/>
    <WSkeleton/>
    </>
  )
}
