"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_BillTypeModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BillTypeModal */ \"./components/BillTypeModal.tsx\");\n/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Table */ \"./components/Table.tsx\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ \"./store/index.ts\");\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar IndexPage = function(param) {\n    var publicBills = param.publicBills, officeBills = param.officeBills;\n    _s();\n    var homePublicBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.homePublicBills;\n    });\n    var homeOfficeBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.homeOfficeBills;\n    });\n    var setHomePublicBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.setHomePublicBills;\n    });\n    var setHomeOfficeBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.setHomeOfficeBills;\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        setHomePublicBills(publicBills);\n        setHomeOfficeBills(officeBills);\n    }, [\n        publicBills,\n        officeBills\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"space-y-12\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                className: \"flex justify-between items-start\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col items-start gap-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-black font-bold text-3xl\",\n                                children: \"الفواتير\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 35,\n                                columnNumber: 6\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"هنا يوجد جميع الفواتير ويمكن البحث فيهم\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 6\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 5\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BillTypeModal__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 5\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                lineNumber: 33,\n                columnNumber: 4\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"space-y-6\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            className: \"bg-base drop-shadow-md w-full border border-black/25 rounded-md h-12\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 6\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 41,\n                        columnNumber: 5\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col lg:flex-row md:gap-4 lg:gap-6\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Table__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                title: \"الفواتير العامة\",\n                                data: homePublicBills.slice(0, 50)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 45,\n                                columnNumber: 6\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Table__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                title: \"الفواتير الخاصة\",\n                                data: homeOfficeBills.slice(0, 50)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 50,\n                                columnNumber: 6\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 5\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                lineNumber: 40,\n                columnNumber: 4\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n        lineNumber: 32,\n        columnNumber: 3\n    }, _this);\n};\n_s(IndexPage, \"XvzKPAZp7THmYEXKcI4pQR+/rvY=\", false, function() {\n    return [\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore\n    ];\n});\n_c = IndexPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (IndexPage);\nvar _c;\n$RefreshReg$(_c, \"IndexPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7O0FBU2tDO0FBQ3NCO0FBQ2hCO0FBQ1M7QUFPakQsSUFBTUksU0FBUyxHQUFHLGdCQUEwQztRQUF2Q0MsV0FBVyxTQUFYQSxXQUFXLEVBQUVDLFdBQVcsU0FBWEEsV0FBVzs7SUFDNUMsSUFBTUMsZUFBZSxHQUFHSixnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRCxlQUFlO0tBQUEsQ0FBQztJQUNsRSxJQUFNRSxlQUFlLEdBQUdOLGdEQUFRLENBQUMsU0FBQ0ssS0FBSztlQUFLQSxLQUFLLENBQUNDLGVBQWU7S0FBQSxDQUFDO0lBQ2xFLElBQU1DLGtCQUFrQixHQUFHUCxnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRSxrQkFBa0I7S0FBQSxDQUFDO0lBQ3hFLElBQU1DLGtCQUFrQixHQUFHUixnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRyxrQkFBa0I7S0FBQSxDQUFDO0lBRXhFWCxnREFBUyxDQUFDLFdBQU07UUFDZlUsa0JBQWtCLENBQUNMLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDTSxrQkFBa0IsQ0FBQ0wsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQyxFQUFFO1FBQUNELFdBQVc7UUFBRUMsV0FBVztLQUFDLENBQUMsQ0FBQztJQUUvQixxQkFDQyw4REFBQ00sS0FBRztRQUFDQyxTQUFTLEVBQUMsWUFBWTs7MEJBQzFCLDhEQUFDQyxRQUFNO2dCQUFDRCxTQUFTLEVBQUMsa0NBQWtDOztrQ0FDbkQsOERBQUNELEtBQUc7d0JBQUNDLFNBQVMsRUFBQyxpQ0FBaUM7OzBDQUMvQyw4REFBQ0UsSUFBRTtnQ0FBQ0YsU0FBUyxFQUFDLCtCQUErQjswQ0FBQyxVQUFROzs7OztxQ0FBSzswQ0FDM0QsOERBQUNHLEdBQUM7MENBQUMseUNBQXVDOzs7OztxQ0FBSTs7Ozs7OzZCQUN6QztrQ0FDTiw4REFBQ2YsaUVBQWE7Ozs7NkJBQWlCOzs7Ozs7cUJBQ3ZCOzBCQUNULDhEQUFDZ0IsTUFBSTtnQkFBQ0osU0FBUyxFQUFHLFdBQVc7O2tDQUM1Qiw4REFBQ0QsS0FBRztrQ0FDSCw0RUFBQ00sT0FBSzs0QkFBQ0MsSUFBSSxFQUFDLE1BQU07NEJBQUNOLFNBQVMsRUFBRyxzRUFBc0U7Ozs7O2lDQUFFOzs7Ozs2QkFDbEc7a0NBQ04sOERBQUNELEtBQUc7d0JBQUNDLFNBQVMsRUFBQyw2Q0FBNkM7OzBDQUMzRCw4REFBQ1gseURBQUs7Z0NBQ0xrQixLQUFLLEVBQUUsaUJBQWlCO2dDQUN4QkMsSUFBSSxFQUFFZCxlQUFlLENBQUNlLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7OztxQ0FDMUI7MENBRVQsOERBQUNwQix5REFBSztnQ0FDTGtCLEtBQUssRUFBRSxpQkFBaUI7Z0NBQ3hCQyxJQUFJLEVBQUVaLGVBQWUsQ0FBQ2EsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Ozs7O3FDQUMxQjs7Ozs7OzZCQUNKOzs7Ozs7cUJBQ0E7Ozs7OzthQUNGLENBQ0w7QUFDSCxDQUFDO0dBdENLbEIsU0FBUzs7UUFDVUQsNENBQVE7UUFDUkEsNENBQVE7UUFDTEEsNENBQVE7UUFDUkEsNENBQVE7OztBQUo5QkMsS0FBQUEsU0FBUzs7QUF3Q2YsK0RBQWVBLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC50c3g/MDdmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRDYWxlbmRhckRheXNJY29uLFxuXHRMaW5rSWNvbixcblx0UGVuY2lsSWNvbixcblx0UGVuY2lsU3F1YXJlSWNvbixcbn0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgR2V0U2VydmVyU2lkZVByb3BzIH0gZnJvbSBcIm5leHRcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEJpbGxUeXBlTW9kYWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvQmlsbFR5cGVNb2RhbFwiO1xuaW1wb3J0IFRhYmxlIGZyb20gXCIuLi9jb21wb25lbnRzL1RhYmxlXCI7XG5pbXBvcnQgeyBQcm9qZWN0QmlsbCwgdXNlU3RvcmUgfSBmcm9tIFwiLi4vc3RvcmVcIjtcblxuaW50ZXJmYWNlIElQcm9wcyB7XG5cdHB1YmxpY0JpbGxzOiBQcm9qZWN0QmlsbFtdO1xuXHRvZmZpY2VCaWxsczogUHJvamVjdEJpbGxbXTtcbn1cblxuY29uc3QgSW5kZXhQYWdlID0gKHsgcHVibGljQmlsbHMsIG9mZmljZUJpbGxzIH06IElQcm9wcykgPT4ge1xuXHRjb25zdCBob21lUHVibGljQmlsbHMgPSB1c2VTdG9yZSgoc3RhdGUpID0+IHN0YXRlLmhvbWVQdWJsaWNCaWxscyk7XG5cdGNvbnN0IGhvbWVPZmZpY2VCaWxscyA9IHVzZVN0b3JlKChzdGF0ZSkgPT4gc3RhdGUuaG9tZU9mZmljZUJpbGxzKTtcblx0Y29uc3Qgc2V0SG9tZVB1YmxpY0JpbGxzID0gdXNlU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5zZXRIb21lUHVibGljQmlsbHMpO1xuXHRjb25zdCBzZXRIb21lT2ZmaWNlQmlsbHMgPSB1c2VTdG9yZSgoc3RhdGUpID0+IHN0YXRlLnNldEhvbWVPZmZpY2VCaWxscyk7XG5cblx0dXNlRWZmZWN0KCgpID0+IHtcblx0XHRzZXRIb21lUHVibGljQmlsbHMocHVibGljQmlsbHMpO1xuXHRcdHNldEhvbWVPZmZpY2VCaWxscyhvZmZpY2VCaWxscyk7XG5cdH0sIFtwdWJsaWNCaWxscywgb2ZmaWNlQmlsbHNdKTtcblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xMlwiPlxuXHRcdFx0PGhlYWRlciBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1zdGFydFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgZ2FwLTJcIj5cblx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPVwidGV4dC1ibGFjayBmb250LWJvbGQgdGV4dC0zeGxcIj7Yp9mE2YHZiNin2KrZitixPC9oMT5cblx0XHRcdFx0XHQ8cD7Zh9mG2Kcg2YrZiNis2K8g2KzZhdmK2Lkg2KfZhNmB2YjYp9iq2YrYsSDZiNmK2YXZg9mGINin2YTYqNit2Ksg2YHZitmH2YU8L3A+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8QmlsbFR5cGVNb2RhbD48L0JpbGxUeXBlTW9kYWw+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdDxtYWluIGNsYXNzTmFtZSA9IFwic3BhY2UteS02XCI+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lID0gXCJiZy1iYXNlIGRyb3Atc2hhZG93LW1kIHctZnVsbCBib3JkZXIgYm9yZGVyLWJsYWNrLzI1IHJvdW5kZWQtbWQgaC0xMlwiLz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBtZDpnYXAtNCBsZzpnYXAtNlwiPlxuXHRcdFx0XHRcdDxUYWJsZVxuXHRcdFx0XHRcdFx0dGl0bGU9e1wi2KfZhNmB2YjYp9iq2YrYsSDYp9mE2LnYp9mF2KlcIn1cblx0XHRcdFx0XHRcdGRhdGE9e2hvbWVQdWJsaWNCaWxscy5zbGljZSgwLCA1MCl9XG5cdFx0XHRcdFx0PjwvVGFibGU+XG5cblx0XHRcdFx0XHQ8VGFibGVcblx0XHRcdFx0XHRcdHRpdGxlPXtcItin2YTZgdmI2KfYqtmK2LEg2KfZhNiu2KfYtdipXCJ9XG5cdFx0XHRcdFx0XHRkYXRhPXtob21lT2ZmaWNlQmlsbHMuc2xpY2UoMCwgNTApfVxuXHRcdFx0XHRcdD48L1RhYmxlPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvbWFpbj5cblx0XHQ8L2Rpdj5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4UGFnZTtcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczogR2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcblx0Y29uc3QgeyBkYXRhOiBiaWxsc0RhdGEgfSA9IGF3YWl0IGF4aW9zKHtcblx0XHR1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2dldEFsbD90eXBlPXB1YmxpY1wiLFxuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdHByb3BzOiB7XG5cdFx0XHRwdWJsaWNCaWxsczogYmlsbHNEYXRhLFxuXHRcdFx0b2ZmaWNlQmlsbHM6IGJpbGxzRGF0YSxcblx0XHR9LFxuXHR9O1xufTtcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJCaWxsVHlwZU1vZGFsIiwiVGFibGUiLCJ1c2VTdG9yZSIsIkluZGV4UGFnZSIsInB1YmxpY0JpbGxzIiwib2ZmaWNlQmlsbHMiLCJob21lUHVibGljQmlsbHMiLCJzdGF0ZSIsImhvbWVPZmZpY2VCaWxscyIsInNldEhvbWVQdWJsaWNCaWxscyIsInNldEhvbWVPZmZpY2VCaWxscyIsImRpdiIsImNsYXNzTmFtZSIsImhlYWRlciIsImgxIiwicCIsIm1haW4iLCJpbnB1dCIsInR5cGUiLCJ0aXRsZSIsImRhdGEiLCJzbGljZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n"));

/***/ })

});