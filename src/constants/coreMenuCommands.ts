import { isEmbedded } from "@/utils/envUtil";

export const CORE_MENU_COMMANDS = isEmbedded() ? [
  [['Workflow'], ['Comfy.OpenWorkflow']],
  [['Edit'], ['Comfy.Undo', 'Comfy.Redo']],
  [['Edit'], ['Comfy.RefreshNodeDefinitions']],
  [['Edit'], ['Comfy.ClearWorkflow']],
  [['Edit'], ['Comfy.OpenClipspace']],
  [
    ['Help'],
    [
      'Comfy.Help.OpenComfyUIIssues',
      'Comfy.Help.OpenComfyUIDocs',
      'Comfy.Help.OpenComfyOrgDiscord',
      'Comfy.Help.OpenComfyUIForum'
    ]
  ],
  [['Help'], ['Comfy.Help.AboutComfyUI', 'Comfy.Feedback']]
] : [
  [['Workflow'], ['Comfy.NewBlankWorkflow']],
  [['Workflow'], ['Comfy.OpenWorkflow', 'Comfy.BrowseTemplates']],
  [
    ['Workflow'],
    [
      'Comfy.SaveWorkflow',
      'Comfy.SaveWorkflowAs',
      'Comfy.ExportWorkflow',
      'Comfy.ExportWorkflowAPI'
    ]
  ],
  [['Edit'], ['Comfy.Undo', 'Comfy.Redo']],
  [['Edit'], ['Comfy.RefreshNodeDefinitions']],
  [['Edit'], ['Comfy.ClearWorkflow']],
  [['Edit'], ['Comfy.OpenClipspace']],
  [
    ['Help'],
    [
      'Comfy.Help.OpenComfyUIIssues',
      'Comfy.Help.OpenComfyUIDocs',
      'Comfy.Help.OpenComfyOrgDiscord',
      'Comfy.Help.OpenComfyUIForum'
    ]
  ],
  [['Help'], ['Comfy.Help.AboutComfyUI', 'Comfy.Feedback']]
]
