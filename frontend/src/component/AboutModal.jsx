export default function AboutModal() {
  return (
    <dialog id="about_modal" className="modal">
      <div className="modal-box bg-neutral/50 backdrop-blur-xl">
        <h1 className="font-bold text-lg">About</h1>
        <div className="flex flex-col">
            <div className="font-bold text-xl">Group Members</div>
            <div>Aira Mae Laron</div>
            <div>Alesundreau Dale Ratuise</div>
            <div>Daryll Dan Caponpon</div>
            <div>Jared Carranza</div>
            <div>Lyco Lacuesta</div>
        </div>
        <div className="h-[1px] w-full bg-white/20 my-2"></div>
        <div>
            AMAT 152 - E2L
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
