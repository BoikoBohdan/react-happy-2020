import {useReducer, useEffect} from "react";
import { proxyStoreManager } from "../stores/proxyStore";

export const useProxySelector = (selector: (state: any) => any) => {
	const [_, forceReRender] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		const unsubscribe = proxyStoreManager.subscribe((newState) => {
			console.log('newState', newState);
			forceReRender();
		});
		return () => unsubscribe();
	}, [selector]);

	const data = selector(proxyStoreManager.getState());

	return data;
};