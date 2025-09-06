import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/Components/ui/dialog"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"

export default function DeleteModal() {
  const [showModal, setShowModal] = useState(false)
  const [reason, setReason] = useState("")

  return (
    <div>
      <Button variant="destructive" onClick={() => setShowModal(true)}>
        Delete
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="dark:text-white font-Poppins font-medium">
              <span className="text-negative">Delete</span> : What does CSS Stand For?
            </DialogTitle>
            <DialogDescription className="font-Poppins font-normal dark:text-white text-black">
              Are you sure you want to delete [<span className="text-negative">What does CSS Stand For?</span>] ?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium font-Poppins">Reason</label>
            <Textarea
              id="reason"
              placeholder="Write a reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="bg-negative" onClick={() => {
              console.log("Deleted with reason:", reason)
              setReason("")
              setShowModal(false)
            }}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
