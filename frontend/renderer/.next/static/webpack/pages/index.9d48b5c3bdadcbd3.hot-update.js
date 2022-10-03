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

/***/ "./store/index.ts":
/*!************************!*\
  !*** ./store/index.ts ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useStore\": function() { return /* binding */ useStore; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_object_spread.mjs */ \"../node_modules/.pnpm/@swc+helpers@0.4.11/node_modules/@swc/helpers/src/_object_spread.mjs\");\n/* harmony import */ var _swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/src/_to_consumable_array.mjs */ \"../node_modules/.pnpm/@swc+helpers@0.4.11/node_modules/@swc/helpers/src/_to_consumable_array.mjs\");\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ \"../node_modules/.pnpm/zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js\");\n/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand/middleware */ \"../node_modules/.pnpm/zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/middleware.js\");\n\n\n\n\nvar storeSlice = function(set) {\n    return {\n        workers: [],\n        homePublicBills: [],\n        homeOfficeBills: [],\n        searchState: \"empty\",\n        setHomePublicBills: function(bills) {\n            return set(function() {\n                return {\n                    homePublicBills: bills\n                };\n            });\n        },\n        setHomeOfficeBills: function(bills) {\n            return set(function() {\n                return {\n                    homeOfficeBills: bills\n                };\n            });\n        },\n        setWorkers: function(workers) {\n            return set(function() {\n                return {\n                    workers: workers\n                };\n            });\n        },\n        newWorker: function(worker) {\n            return set(function(state) {\n                return {\n                    workers: (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(state.workers).concat([\n                        worker\n                    ])\n                };\n            });\n        }\n    };\n};\nvar newProjectBillSlice = function(set) {\n    return {\n        id: 0,\n        officePrecentage: 0,\n        name: \"\",\n        clientName: \"\",\n        clientAddress: \"\",\n        date: \"\",\n        expenses: [],\n        revenues: [],\n        sections: [],\n        workers: []\n    };\n};\nvar useStore = (0,zustand__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_2__.devtools)(function() {\n    for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){\n        a[_key] = arguments[_key];\n    }\n    return (0,_swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({}, newProjectBillSlice.apply(void 0, (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a)), storeSlice.apply(void 0, (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a)));\n}, {\n    name: \"app-storage\"\n}));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUErQztBQUNRO0FBNkR2RCxJQUFNRSxVQUFVLEdBS1osU0FBQ0MsR0FBRztXQUFNO1FBQ2JDLE9BQU8sRUFBRSxFQUFFO1FBQ1hDLGVBQWUsRUFBRSxFQUFFO1FBQ25CQyxlQUFlLEVBQUUsRUFBRTtRQUNuQkMsV0FBVyxFQUFFLE9BQU87UUFDcEJDLGtCQUFrQixFQUFFLFNBQUNDLEtBQUs7bUJBQUtOLEdBQUcsQ0FBQzt1QkFBTztvQkFBRUUsZUFBZSxFQUFFSSxLQUFLO2lCQUFFO2FBQUMsQ0FBQztTQUFBO1FBQ3RFQyxrQkFBa0IsRUFBRSxTQUFDRCxLQUFLO21CQUFLTixHQUFHLENBQUM7dUJBQU87b0JBQUVHLGVBQWUsRUFBRUcsS0FBSztpQkFBRTthQUFDLENBQUM7U0FBQTtRQUN0RUUsVUFBVSxFQUFFLFNBQUNQLE9BQU87bUJBQUtELEdBQUcsQ0FBQzt1QkFBTztvQkFBRUMsT0FBTyxFQUFFQSxPQUFPO2lCQUFFO2FBQUMsQ0FBQztTQUFBO1FBQzFEUSxTQUFTLEVBQUUsU0FBQ0MsTUFBTTttQkFDakJWLEdBQUcsQ0FBQyxTQUFDVyxLQUFLLEVBQUs7Z0JBQ2QsT0FBTztvQkFBRVYsT0FBTyxFQUFFLHFGQUFJVSxLQUFLLENBQUNWLE9BQU8sQ0FBYlUsUUFBSjt3QkFBbUJELE1BQU07cUJBQUM7aUJBQUUsQ0FBQztZQUNoRCxDQUFDLENBQUM7U0FBQTtLQUNIO0NBQUM7QUFlRixJQUFNRSxtQkFBbUIsR0FLckIsU0FBQ1osR0FBRztXQUFNO1FBQ2JhLEVBQUUsRUFBRSxDQUFDO1FBQ0xDLGdCQUFnQixFQUFFLENBQUM7UUFDbkJDLElBQUksRUFBRSxFQUFFO1FBQ1JDLFVBQVUsRUFBRSxFQUFFO1FBQ2RDLGFBQWEsRUFBRSxFQUFFO1FBQ2pCQyxJQUFJLEVBQUUsRUFBRTtRQUNSQyxRQUFRLEVBQUUsRUFBRTtRQUNaQyxRQUFRLEVBQUUsRUFBRTtRQUNaQyxRQUFRLEVBQUUsRUFBRTtRQUNacEIsT0FBTyxFQUFFLEVBQUU7S0FDWDtDQUFDO0FBRUssSUFBTXFCLFFBQVEsR0FBR3pCLG1EQUFNLEVBQTBCLENBQ3ZEQyw0REFBUSxDQUNQO3FDQUFJeUIsQ0FBQztRQUFEQSxDQUFDOztXQUFNLG1GQUFLWCxtQkFBbUIsQ0FBbkJBLEtBQXlCLENBQXpCQSxLQUFBQSxDQUFtQixFQUFDLHFGQUFHVyxDQUFDLENBQURBLENBQUUsRUFBS3hCLFVBQVUsQ0FBVkEsS0FBZ0IsQ0FBaEJBLEtBQUFBLENBQVUsRUFBQyxxRkFBR3dCLENBQUMsQ0FBREEsQ0FBRSxDQUFFO0NBQUMsRUFDakU7SUFDQ1IsSUFBSSxFQUFFLGFBQWE7Q0FDbkIsQ0FDRCxDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3RvcmUvaW5kZXgudHM/YjViMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlLCB7IFN0YXRlQ3JlYXRvciB9IGZyb20gXCJ6dXN0YW5kXCI7XHJcbmltcG9ydCB7IGRldnRvb2xzLCBwZXJzaXN0IH0gZnJvbSBcInp1c3RhbmQvbWlkZGxld2FyZVwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IHByb2R1Y2UgfSBmcm9tIFwiaW1tZXJcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdEJpbGwge1xyXG5cdGlkOiBudW1iZXI7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGNsaWVudE5hbWU6IHN0cmluZztcclxuXHRjbGllbnRBZGRyZXNzOiBzdHJpbmc7XHJcblx0b2ZmaWNlUHJlY2VudGFnZTogbnVtYmVyO1xyXG5cdHdvcmtlcnM6IFdvcmtlcltdO1xyXG5cdHJldmVudWVzOiBSZXZlbnVlW107XHJcblx0ZXhwZW5zZXM6IEV4cGVuc2VbXTtcclxuXHRzZWN0aW9uczogU2VjdGlvbltdO1xyXG5cdGRhdGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXb3JrZXIge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHdvcms6IHN0cmluZztcclxuXHRwcm9qZWN0Pzoge1xyXG5cdFx0aWQ6IG51bWJlcjtcclxuXHRcdHNhbGFyeTogbnVtYmVyO1xyXG5cdFx0cHJlY2VudGFnZT86IG51bWJlcjtcclxuXHRcdGRhdGU6IHN0cmluZztcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJldmVudWUge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0YW1vdW50OiBzdHJpbmc7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlY3Rpb24ge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGV4cGVuc2VzOiBFeHBlbnNlW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhwZW5zZSB7XHJcblx0aWQ6IHN0cmluZztcclxuXHRtYXRlcmlhbE5hbWU6IHN0cmluZztcclxuXHR0b3RhbGNvc3Q6IG51bWJlcjtcclxuXHRkYXk6IHN0cmluZztcclxuXHRzZWN0aW9uPzogbnVtYmVyO1xyXG5cdGRhdGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZSB7XHJcblx0d29ya2VyczogV29ya2VyW107XHJcblx0aG9tZVB1YmxpY0JpbGxzOiBQcm9qZWN0QmlsbFtdO1xyXG5cdGhvbWVPZmZpY2VCaWxsczogUHJvamVjdEJpbGxbXTtcclxuXHRzZWFyY2hTdGF0ZTogXCJsb2FkaW5nXCIgfCBcImVtcHR5XCI7XHJcblx0c2V0SG9tZVB1YmxpY0JpbGxzOiAocHJvamVjdEJpbGxzOiBQcm9qZWN0QmlsbFtdKSA9PiB2b2lkO1xyXG5cdHNldEhvbWVPZmZpY2VCaWxsczogKHByb2plY3RCaWxsczogUHJvamVjdEJpbGxbXSkgPT4gdm9pZDtcclxuXHRzZXRXb3JrZXJzOiAod29ya2VyczogV29ya2VyW10pID0+IHZvaWQ7XHJcblx0bmV3V29ya2VyOiAod29ya2VyOiBXb3JrZXIpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IHN0b3JlU2xpY2U6IFN0YXRlQ3JlYXRvcjxcclxuXHRTdGF0ZSAmIFByb2plY3RCaWxsLFxyXG5cdFtbXCJ6dXN0YW5kL2RldnRvb2xzXCIsIG5ldmVyXV0sXHJcblx0W10sXHJcblx0U3RhdGVcclxuPiA9IChzZXQpID0+ICh7XHJcblx0d29ya2VyczogW10sXHJcblx0aG9tZVB1YmxpY0JpbGxzOiBbXSxcclxuXHRob21lT2ZmaWNlQmlsbHM6IFtdLFxyXG5cdHNlYXJjaFN0YXRlOiBcImVtcHR5XCIsXHJcblx0c2V0SG9tZVB1YmxpY0JpbGxzOiAoYmlsbHMpID0+IHNldCgoKSA9PiAoeyBob21lUHVibGljQmlsbHM6IGJpbGxzIH0pKSxcclxuXHRzZXRIb21lT2ZmaWNlQmlsbHM6IChiaWxscykgPT4gc2V0KCgpID0+ICh7IGhvbWVPZmZpY2VCaWxsczogYmlsbHMgfSkpLFxyXG5cdHNldFdvcmtlcnM6ICh3b3JrZXJzKSA9PiBzZXQoKCkgPT4gKHsgd29ya2Vyczogd29ya2VycyB9KSksXHJcblx0bmV3V29ya2VyOiAod29ya2VyKSA9PlxyXG5cdFx0c2V0KChzdGF0ZSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4geyB3b3JrZXJzOiBbLi4uc3RhdGUud29ya2Vycywgd29ya2VyXSB9O1xyXG5cdFx0fSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBuZXdQcm9qZWN0QmlsbCB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0Y2xpZW50TmFtZTogc3RyaW5nO1xyXG5cdGNsaWVudEFkZHJlc3M6IHN0cmluZztcclxuXHRvZmZpY2VQcmVjZW50YWdlOiBudW1iZXI7XHJcblx0d29ya2VyczogV29ya2VyW107XHJcblx0cmV2ZW51ZXM6IFJldmVudWVbXTtcclxuXHRleHBlbnNlczogRXhwZW5zZVtdO1xyXG5cdHNlY3Rpb25zOiBTZWN0aW9uW107XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBuZXdQcm9qZWN0QmlsbFNsaWNlOiBTdGF0ZUNyZWF0b3I8XHJcblx0bmV3UHJvamVjdEJpbGwgJiBTdGF0ZSxcclxuXHRbW1wienVzdGFuZC9kZXZ0b29sc1wiLCBuZXZlcl1dLFxyXG5cdFtdLFxyXG5cdG5ld1Byb2plY3RCaWxsXHJcbj4gPSAoc2V0KSA9PiAoe1xyXG5cdGlkOiAwLFxyXG5cdG9mZmljZVByZWNlbnRhZ2U6IDAsXHJcblx0bmFtZTogXCJcIixcclxuXHRjbGllbnROYW1lOiBcIlwiLFxyXG5cdGNsaWVudEFkZHJlc3M6IFwiXCIsXHJcblx0ZGF0ZTogXCJcIixcclxuXHRleHBlbnNlczogW10sXHJcblx0cmV2ZW51ZXM6IFtdLFxyXG5cdHNlY3Rpb25zOiBbXSxcclxuXHR3b3JrZXJzOiBbXSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlU3RvcmUgPSBjcmVhdGU8U3RhdGUgJiBuZXdQcm9qZWN0QmlsbD4oKShcclxuXHRkZXZ0b29scyhcclxuXHRcdCguLi5hKSA9PiAoeyAuLi5uZXdQcm9qZWN0QmlsbFNsaWNlKC4uLmEpLCAuLi5zdG9yZVNsaWNlKC4uLmEpIH0pLFxyXG5cdFx0e1xyXG5cdFx0XHRuYW1lOiBcImFwcC1zdG9yYWdlXCIsXHJcblx0XHR9LFxyXG5cdCksXHJcbik7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGUiLCJkZXZ0b29scyIsInN0b3JlU2xpY2UiLCJzZXQiLCJ3b3JrZXJzIiwiaG9tZVB1YmxpY0JpbGxzIiwiaG9tZU9mZmljZUJpbGxzIiwic2VhcmNoU3RhdGUiLCJzZXRIb21lUHVibGljQmlsbHMiLCJiaWxscyIsInNldEhvbWVPZmZpY2VCaWxscyIsInNldFdvcmtlcnMiLCJuZXdXb3JrZXIiLCJ3b3JrZXIiLCJzdGF0ZSIsIm5ld1Byb2plY3RCaWxsU2xpY2UiLCJpZCIsIm9mZmljZVByZWNlbnRhZ2UiLCJuYW1lIiwiY2xpZW50TmFtZSIsImNsaWVudEFkZHJlc3MiLCJkYXRlIiwiZXhwZW5zZXMiLCJyZXZlbnVlcyIsInNlY3Rpb25zIiwidXNlU3RvcmUiLCJhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/index.ts\n"));

/***/ })

});