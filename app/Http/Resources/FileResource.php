<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'file_id'       => $this->file_id,
            'code'          => $this->code,
            'filename'      => $this->filename,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'user_id'       => $this->user_id,
        ];
    }
}
