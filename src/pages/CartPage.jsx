import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CartPage() {
  return (
    <section className='section pt-24'>
      <div className='container flex flex-col items-center gap-8'>

        <h4 className='text-3xl'>Cart</h4>

        <div
          key={uuidv4()}
          className="p-6 flex justify-between items-end gap-4 ring-4 ring-gray-500 bg-white rounded-xl w-2/3"
        >
          <div>

            <p className="text-gray-400 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum odit maxime doloremque nostrum magnam unde laudantium amet voluptates iure, ducimus fugiat impedit. Magnam enim ipsam similique aut ut maxime sit!</p>
          </div>
        </div>
      </div>

    </section>
  )
}
