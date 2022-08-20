import { lazy } from "react"


export function lazyWithPreload (factory){
  const Component = lazy(factory)
  Component.preload = factory
  return Component
}
  // usage, const NewComponent = lazyWithPreload(()=>import(/* webpackPrefetch: true *//* webpackPreload: true *//* webpackChunkName: 'mychunkname' *//* webpackMode: 'lazy' */ '../newcomponent'))
  // to preload, NewComponent.preload()import { lazy } from 'react';

  