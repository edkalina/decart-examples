import { featuredAtom, helpers } from "../decart-react";

export default function loadingSim() {
  return featuredAtom(api => {
    let timeout = null;

    function tick() {
      const { counter } = api.getStateValue();
      api.setStateValue({ loading: counter > 1, counter: counter - 1 });
      if (counter > 1) {
        timeout = setTimeout(tick, 1000);
      }
    }

    function startLoading() {
      const { loading } = api.getStateValue();
      if (loading) return;
      timeout = setTimeout(tick, 1000);
      api.setStateValue({ loading: true, counter: 5 });
    }

    api.initStateValue({ loading: false, counter: 0, startLoading });
    api.listen("unmount", () => timeout && clearTimeout(timeout));

    return helpers.valuesExtender(() => api.getStateValue());
  });
}
