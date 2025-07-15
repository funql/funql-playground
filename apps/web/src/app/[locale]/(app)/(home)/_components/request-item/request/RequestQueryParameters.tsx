"use client"

import {useEditorState} from "@/app/[locale]/(app)/(home)/_hooks/useEditorState";
import React, {Fragment, useCallback, useMemo} from "react";
import FunQLEditor from "@/components/code/FunQLEditor";
import {Separator} from "@workspace/ui/components/separator";
import {cn} from "@workspace/ui/lib/utils";
import {useTranslations} from "next-intl";

export default function RequestQueryParameters({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("HomePage.request.RequestQueryParameters")

  const { activeRequest, updateActiveRequest } = useEditorState()

  const updateQueryParameter = useCallback((key: string, value: string) => {
    updateActiveRequest(prev => {
      const qp = prev.queryParameters.find(it => it[0] === key)
      if (qp) {
        qp[1] = value
      }
    })
  }, [updateActiveRequest])

  // Only use initial queryParameters value for activeRequest to avoid overriding CodeEditor value on each change,
  // causing issues with fast updates
  const queryParameters = useMemo(() => {
    return activeRequest?.queryParameters
    // Only recalculate on ID changes so we get the latest initial value for the 'activeRequest' and not any subsequent
    // changes to queryParameters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRequest?.id, activeRequest?.changeId])

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        className
      )}
      {...props}
    >
      <span className="font-medium">
        {t("titleText")}
      </span>

      <div className="flex flex-col border rounded-sm min-w-fit">
        {queryParameters?.map(([key, value], index) => (
          <Fragment key={key}>
            <div className="flex gap-2 min-h-10">
              <span className="min-w-24 mt-2.5 ps-2.5 text-sm">
                {key}
              </span>

              {
                /* Set key to force FunQLEditor refresh when changeId changes, so 'value' is reset even when it's equal
                 * to the initial value. This is necessary when e.g. user want to reset the query parameters
                 */
              }
              <FunQLEditor
                key={activeRequest?.changeId}
                className="flex-1 shrink border-l py-2"
                inline={true}
                value={value}
                onChange={newVal => updateQueryParameter(key, newVal)}
              />
            </div>

            {index < queryParameters.length - 1 && (
              <Separator/>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}